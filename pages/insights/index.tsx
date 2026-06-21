/* eslint-disable no-multiple-empty-lines */
import { InferGetStaticPropsType } from "next"
import NextLink from "next/link"
import { useState } from "react"
import styled, { keyframes } from "styled-components"
import { Button } from "tinacms"


import AutofitGrid from "components/AutofitGrid"
import Container from "components/Container"
import Input from "components/Input"
import Page from "components/Page"
import SectionTitle from "components/SectionTitle"
import { media } from "utils/media"
import { getAllPosts } from "utils/postsFetcher"

import placementData from "./2025placement.json"

export default function BlogIndexPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
	const [searchValue, setSearchValue] = useState("")
	function extractNameAndCompany(title: string) {
		const [name, company] = title.split("Placed at :").map(str => str.trim())
		return {
			name,
			company,
		}
	}
	const filteredBlogPosts = posts.filter((singlePost) => {
		const searchContent = singlePost.meta.title + singlePost.meta.description + singlePost.content + singlePost.meta.tags
		return searchContent.toLowerCase().includes(searchValue.toLowerCase())
	}).sort((a, b) => {
		return new Date(b.meta.date).valueOf() - new Date(a.meta.date).valueOf()
	})

	const PREVINSIGHTS = [
		"2022",
		"2023"
	]

	return (
		<Page title="SPO Insights" description="">
			<div>
				<CustomInput
					aria-label="Search articles"
					type="text"
					onChange={(e) => setSearchValue(e.target.value)}
					placeholder="Search articles"
				/>
			</div>
			<br />
			<div style={{ width: "100%", display: "grid", placeItems: "center" }}>
				<CustomSectionTitle>2025 Placement Insight</CustomSectionTitle>
				<br></br>
				<CustomAutofitGrid>
					{placementData.map((item, idx) => (
						<NextLink
							href={item.Upload}
							passHref
							key={idx}
						>

							<Card>
								<BlogItem>
									<BlogTitle>{item.Name}<br></br>Placed at: {item.Company}</BlogTitle>
								</BlogItem>
							</Card>
						</NextLink>
					))}
				</CustomAutofitGrid>
			</div>
			<br />
			<div style={{ width: "100%", display: "grid", placeItems: "center" }}>
				{!filteredBlogPosts.length && "No posts found."}
				<CustomSectionTitle>{filteredBlogPosts.length && "2024 Placement Insight"}</CustomSectionTitle>
				<br></br>
				<CustomAutofitGrid>
					{filteredBlogPosts.map((singlePost, idx) => {
						if (singlePost.slug.includes("2024-placement")) {
							return (
								<NextLink href={"/insights/" + singlePost.slug} passHref key={idx}>

									<Card>
										<BlogItem>
											{/* <BlogDate>{singlePost.meta.date}</BlogDate> */}
											<BlogTitle>{singlePost.meta.title}</BlogTitle>
										</BlogItem>
									</Card>
								</NextLink>
							)
						} else {
							return <></>
						}
					})}
				</CustomAutofitGrid>
			</div>
			<br />
			<div style={{ width: "100%", display: "grid", placeItems: "center" }}>

				{!filteredBlogPosts.length && "No posts found."}
				<CustomSectionTitle>{filteredBlogPosts.length && "2024 Internship Insight"}</CustomSectionTitle>
				<br></br>
				<CustomAutofitGrid>
					{filteredBlogPosts.map((singlePost, idx) => {
						if (singlePost.slug.includes("2024-intern")) {
							return (
								<NextLink href={"/insights/" + singlePost.slug} passHref key={idx}>
									<Card>
										<BlogItem>
											{/* <BlogDate>{singlePost.meta.date}</BlogDate> */}
											<BlogTitle>{singlePost.meta.title}</BlogTitle>
										</BlogItem>
									</Card>
								</NextLink>
							)
						} else {
							return <></>
						}

					})}
				</CustomAutofitGrid>
			</div>
		</Page>
	)
}

const CustomInput = styled(Input)`
	width: 100%;
	height: 3rem;
	margin-bottom: 1rem;
`

const CustomUl = styled.ul`
	list-style:none;
	width: 90%;
	@media (max-width: 768px) {
		width: 50%;
		margin-left: 0;
		padding-inline-start: 0;
	}
	
`
const CustomAutofitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const CustomSectionTitle = styled(SectionTitle)`
	@media (max-width: 768px) {
		font-size: 3.1em;
	}
`

const BlogTitle = styled.div`
	flex: 1;
	font-size: 1.1em;
`

const BlogDate = styled.span`
	flex: 0 0 100px;
	font-weight: normal;
	@media (max-width: 768px) {
		display: none;
	}
`

const BlogItem = styled.li`
	text-decoration: none;
	margin-bottom: 0.7rem;
	cursor: pointer;
	font-size: 1.5rem;
	font-weight: bold;
	display: flex;
	flex-direction: row;
	gap: 1rem;
	@media (max-width: 768px) {
		flex-direction: column;
		gap: 0;
		border-bottom: 1px dashed #ccc;
	}
`
const Dropdown = styled.div`
	postion : "relative"
	display : "inline-block"
`

const DropdownMenu = styled.div`
	display: none;
	position: absolute;
	background-color: #f9f9f9;
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	z-index: 1;
`
const Card = styled.div`
  display: flex;
  padding: 1rem;
  background: rgb(var(--cardBackground));
  box-shadow: var(--shadow-md);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  border-radius: 0.6rem;
  color: rgb(var(--text));
  font-size: 1.6rem;
  cursor: pointer;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px) scale(1.04);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`
// const Card = styled.div`
//   display: flex;
//   padding: 1rem;
//   background: rgb(var(--cardBackground));
//   box-shadow: var(--shadow-md);
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   width: 100%;
//   border-radius: 0.6rem;
//   color: rgb(var(--text));
//   font-size: 1.6rem;

//   & > *:not(:first-child) {
//     margin-top: 1rem;
//   }
// `

// const CustomAutofitGrid = styled(AutofitGrid)`
//   --autofit-grid-item-size: 100rem;

//   ${media("<=tablet")} {
//     --autofit-grid-item-size: 15rem;
//   }

//   ${media("<=phone")} {
//     --autofit-grid-item-size: 50%;
//   }
// `

const Link = styled.a`
  text-decoration: none;
  color: var(--primary);
`

const Title = styled.div`
  font-weight: bold;
`

export async function getStaticProps() {
	return {
		props: {
			posts: await getAllPosts(),
		},
	}
}
