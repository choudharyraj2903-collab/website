import dynamic from "next/dynamic"
import NextLink from "next/link"
import { useRouter } from "next/router"
import React, { useRef, useState } from "react"
import styled from "styled-components"

import { useNewsletterModalContext } from "contexts/newsletter-modal.context"
import { ScrollPositionEffectProps, useScrollPosition } from "hooks/useScrollPosition"
import { media } from "utils/media"

import Button from "./Button"
import Container from "./Container"
import Drawer from "./Drawer"
import { HamburgerIcon } from "./HamburgerIcon"
import Logo from "./Logo"

const ColorSwitcher = dynamic(() => import("../components/ColorSwitcher"), { ssr: false })

export interface SingleNavItem {
  title: string;
  href: string;
  outlined?: boolean;
  children?: {
    title: string;
    href: string;
  }[];
}

export type NavItems = SingleNavItem[];

type NavbarProps = { items: NavItems };
type ScrollingDirections = "up" | "down" | "none";
type NavbarContainerProps = { hidden: boolean; transparent: boolean };

export default function Navbar({ items }: NavbarProps) {
	const router = useRouter()
	const { toggle } = Drawer.useDrawer()
	const [scrollingDirection, setScrollingDirection] = useState<ScrollingDirections>("none")

	const lastScrollY = useRef(0)
	const lastRoute = useRef("")
	const stepSize = useRef(50)

	useScrollPosition(scrollPositionCallback, [router.asPath], undefined, undefined, 50)

	function scrollPositionCallback({ currPos }: ScrollPositionEffectProps) {
		const routerPath = router.asPath
		const hasRouteChanged = routerPath !== lastRoute.current

		if (hasRouteChanged) {
			lastRoute.current = routerPath
			setScrollingDirection("none")
			return
		}

		const currentScrollY = currPos.y
		const isScrollingUp = currentScrollY > lastScrollY.current
		const scrollDifference = Math.abs(lastScrollY.current - currentScrollY)
		const hasScrolledWholeStep = scrollDifference >= stepSize.current
		const isInNonCollapsibleArea = lastScrollY.current > -50

		if (isInNonCollapsibleArea) {
			setScrollingDirection("none")
			lastScrollY.current = currentScrollY
			return
		}

		if (!hasScrolledWholeStep) {
			lastScrollY.current = currentScrollY
			return
		}

		setScrollingDirection(isScrollingUp ? "up" : "down")
		lastScrollY.current = currentScrollY
	}

	const isNavbarHidden = scrollingDirection === "down"
	const isTransparent = scrollingDirection === "none"

	return (
		<NavbarContainer hidden={isNavbarHidden} transparent={isTransparent}>
			<Content>
				<NextLink href="/" passHref>
					<LogoWrapper>
						<Logo />
					</LogoWrapper>
				</NextLink>
				<NavItemList>
					{items.map((singleItem) => (
						<NavItem key={singleItem.href} {...singleItem} />
					))}
				</NavItemList>
				<HamburgerMenuWrapper>
					<HamburgerIcon aria-label="Toggle menu" onClick={toggle} />
				</HamburgerMenuWrapper>
			</Content>
		</NavbarContainer>
	)
}

function NavItem({ href, title, outlined, children }: SingleNavItem) {
	const { setIsModalOpened } = useNewsletterModalContext()

	function showNewsletterModal() {
		setIsModalOpened(true)
	}

	if (outlined) {
		return <CustomButton onClick={showNewsletterModal}>{title}</CustomButton>
	}

	if (children) {
		return (
			<NavItemWrapper>
				<NextLink href={href} passHref>
					<a>
						{title}
						<svg
							width="20"
							height="20"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							style={{ marginLeft: "0.25rem" }}
						>
							<path
								d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
								fill="currentColor"
								fillRule="evenodd"
								clipRule="evenodd"
							></path>
						</svg>
					</a>
				</NextLink>
				<DropdownMenu>
					{children.map((child) => (
						<DropdownMenuItem key={child.href}>
							<NextLink href={child.href} passHref>
								<a>{child.title}</a>
							</NextLink>
						</DropdownMenuItem>
					))}
				</DropdownMenu>
			</NavItemWrapper>
		)
	}

	return null
}

const CustomButton = styled(Button)`
  padding: 0.75rem 1.5rem;
  line-height: 1.8;
`

const NavItemList = styled.div`
  display: flex;
  list-style: none;

  ${media("<desktop")} {
    display: none;
  }
`

const HamburgerMenuWrapper = styled.div`
  ${media(">=desktop")} {
    display: none;
  }
`

const LogoWrapper = styled.a`
  display: flex;
  margin-right: auto;
  text-decoration: none;
  color: rgb(var(--logoColor));
`
const DropdownMenu = styled.ul`
  display: block; /* Changed from none to allow transitions to work */
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  padding: 1rem;
  min-width: 220px;
  background-color: rgb(var(--navbarBackground));
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  z-index: calc(var(--z-navbar) + 1);
  
  /* Initial hidden state */
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  
  /* Transition for hiding */
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0s 0.15s;
`

const DropdownMenuItem = styled.li`
  a {
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: none;
    letter-spacing: normal;
    padding: 0.75rem 1.25rem;
    color: rgb(var(--text), 0.85);
    display: block;
    border-radius: 0.25rem;
    white-space: nowrap;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(var(--primary), 0.1);
      color: rgb(var(--primary));
    }
  }
`

const NavItemWrapper = styled.li<{ outlined?: boolean }>`
  position: relative;
  background-color: ${(p) => (p.outlined ? "rgb(var(--primary))" : "transparent")};
  border-radius: 0.5rem;
  font-size: 1.3rem;
  text-transform: uppercase;
  line-height: 2;
  
  /* A slightly larger hover "bridge" */
  padding-bottom: 1rem; 
  margin-bottom: -1rem;

  &:hover > ${DropdownMenu} {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    /* Transition for appearing instantly */
    transition-delay: 0s;
  }

  a {
    display: flex;
    align-items: center;
    color: ${(p) => (p.outlined ? "rgb(var(--textSecondary))" : "rgb(var(--text), 0.75)")};
    letter-spacing: 0.025em;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font-weight: 700;
  }

  &:not(:last-child) {
    margin-right: 2rem;
  }
`

const NavbarContainer = styled.div<NavbarContainerProps>`
  display: flex;
  position: sticky;
  top: 0;
  padding: 1.5rem 0;
  width: 100%;
  height: 8rem;
  z-index: var(--z-navbar);

  background-color: rgb(var(--navbarBackground));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  visibility: ${(p) => (p.hidden ? "hidden" : "visible")};
  transform: ${(p) => (p.hidden ? "translateY(-8rem) translateZ(0) scale(1)" : "translateY(0) translateZ(0) scale(1)")};

  transition-property: transform, visibility, height, box-shadow, background-color;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
`

const Content = styled(Container)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
