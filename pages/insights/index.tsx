// /* eslint-disable no-multiple-empty-lines */
// import { InferGetStaticPropsType } from "next"
// import NextLink from "next/link"
// import { useState } from "react"
// import styled, { keyframes } from "styled-components"
// import { Button } from "tinacms"


// import AutofitGrid from "components/AutofitGrid"
// import Container from "components/Container"
// import Input from "components/Input"
// import Page from "components/Page"
// import SectionTitle from "components/SectionTitle"
// import { media } from "utils/media"
// import { getAllPosts } from "utils/postsFetcher"

// import placementData from "./2025placement.json"

// export default function BlogIndexPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
// 	const [searchValue, setSearchValue] = useState("")
// 	function extractNameAndCompany(title: string) {
// 		const [name, company] = title.split("Placed at :").map(str => str.trim())
// 		return {
// 			name,
// 			company,
// 		}
// 	}
// 	const filteredBlogPosts = posts.filter((singlePost) => {
// 		const searchContent = singlePost.meta.title + singlePost.meta.description + singlePost.content + singlePost.meta.tags
// 		return searchContent.toLowerCase().includes(searchValue.toLowerCase())
// 	}).sort((a, b) => {
// 		return new Date(b.meta.date).valueOf() - new Date(a.meta.date).valueOf()
// 	})

// 	const PREVINSIGHTS = [
// 		"2022",
// 		"2023"
// 	]

// 	return (
// 		<Page title="SPO Insights" description="">
// 			<div>
// 				<CustomInput
// 					aria-label="Search articles"
// 					type="text"
// 					onChange={(e) => setSearchValue(e.target.value)}
// 					placeholder="Search articles"
// 				/>
// 			</div>
// 			<br />
// 			<div style={{ width: "100%", display: "grid", placeItems: "center" }}>
// 				<CustomSectionTitle>2025 Placement Insight</CustomSectionTitle>
// 				<br></br>
// 				<CustomAutofitGrid>
// 					{placementData.map((item, idx) => (
// 						<NextLink
// 							href={item.Upload}
// 							passHref
// 							key={idx}
// 						>

// 							<Card>
// 								<BlogItem>
// 									<BlogTitle>{item.Name}<br></br>Placed at: {item.Company}</BlogTitle>
// 								</BlogItem>
// 							</Card>
// 						</NextLink>
// 					))}
// 				</CustomAutofitGrid>
// 			</div>
// 			<br />
// 			<div style={{ width: "100%", display: "grid", placeItems: "center" }}>
// 				{!filteredBlogPosts.length && "No posts found."}
// 				<CustomSectionTitle>{filteredBlogPosts.length && "2024 Placement Insight"}</CustomSectionTitle>
// 				<br></br>
// 				<CustomAutofitGrid>
// 					{filteredBlogPosts.map((singlePost, idx) => {
// 						if (singlePost.slug.includes("2024-placement")) {
// 							return (
// 								<NextLink href={"/insights/" + singlePost.slug} passHref key={idx}>

// 									<Card>
// 										<BlogItem>
// 											{/* <BlogDate>{singlePost.meta.date}</BlogDate> */}
// 											<BlogTitle>{singlePost.meta.title}</BlogTitle>
// 										</BlogItem>
// 									</Card>
// 								</NextLink>
// 							)
// 						} else {
// 							return <></>
// 						}
// 					})}
// 				</CustomAutofitGrid>
// 			</div>
// 			<br />
// 			<div style={{ width: "100%", display: "grid", placeItems: "center" }}>

// 				{!filteredBlogPosts.length && "No posts found."}
// 				<CustomSectionTitle>{filteredBlogPosts.length && "2024 Internship Insight"}</CustomSectionTitle>
// 				<br></br>
// 				<CustomAutofitGrid>
// 					{filteredBlogPosts.map((singlePost, idx) => {
// 						if (singlePost.slug.includes("2024-intern")) {
// 							return (
// 								<NextLink href={"/insights/" + singlePost.slug} passHref key={idx}>
// 									<Card>
// 										<BlogItem>
// 											{/* <BlogDate>{singlePost.meta.date}</BlogDate> */}
// 											<BlogTitle>{singlePost.meta.title}</BlogTitle>
// 										</BlogItem>
// 									</Card>
// 								</NextLink>
// 							)
// 						} else {
// 							return <></>
// 						}

// 					})}
// 				</CustomAutofitGrid>
// 			</div>
// 		</Page>
// 	)
// }

// const CustomInput = styled(Input)`
// 	width: 100%;
// 	height: 3rem;
// 	margin-bottom: 1rem;
// `

// const CustomUl = styled.ul`
// 	list-style:none;
// 	width: 90%;
// 	@media (max-width: 768px) {
// 		width: 50%;
// 		margin-left: 0;
// 		padding-inline-start: 0;
// 	}
	
// `
// const CustomAutofitGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 1rem;
//   width: 100%;

//   @media (max-width: 768px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (max-width: 480px) {
//     grid-template-columns: 1fr;
//   }
// `

// const CustomSectionTitle = styled(SectionTitle)`
// 	@media (max-width: 768px) {
// 		font-size: 3.1em;
// 	}
// `

// const BlogTitle = styled.div`
// 	flex: 1;
// 	font-size: 1.1em;
// `

// const BlogDate = styled.span`
// 	flex: 0 0 100px;
// 	font-weight: normal;
// 	@media (max-width: 768px) {
// 		display: none;
// 	}
// `

// const BlogItem = styled.li`
// 	text-decoration: none;
// 	margin-bottom: 0.7rem;
// 	cursor: pointer;
// 	font-size: 1.5rem;
// 	font-weight: bold;
// 	display: flex;
// 	flex-direction: row;
// 	gap: 1rem;
// 	@media (max-width: 768px) {
// 		flex-direction: column;
// 		gap: 0;
// 		border-bottom: 1px dashed #ccc;
// 	}
// `
// const Dropdown = styled.div`
// 	postion : "relative"
// 	display : "inline-block"
// `

// const DropdownMenu = styled.div`
// 	display: none;
// 	position: absolute;
// 	background-color: #f9f9f9;
// 	min-width: 160px;
// 	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
// 	z-index: 1;
// `
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
//   cursor: pointer;

//   transition:
//     transform 0.3s ease,
//     box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-8px) scale(1.04);
//     box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
//   }
// `
// // const Card = styled.div`
// //   display: flex;
// //   padding: 1rem;
// //   background: rgb(var(--cardBackground));
// //   box-shadow: var(--shadow-md);
// //   flex-direction: column;
// //   justify-content: center;
// //   align-items: center;
// //   text-align: center;
// //   width: 100%;
// //   border-radius: 0.6rem;
// //   color: rgb(var(--text));
// //   font-size: 1.6rem;

// //   & > *:not(:first-child) {
// //     margin-top: 1rem;
// //   }
// // `

// // const CustomAutofitGrid = styled(AutofitGrid)`
// //   --autofit-grid-item-size: 100rem;

// //   ${media("<=tablet")} {
// //     --autofit-grid-item-size: 15rem;
// //   }

// //   ${media("<=phone")} {
// //     --autofit-grid-item-size: 50%;
// //   }
// // `

// const Link = styled.a`
//   text-decoration: none;
//   color: var(--primary);
// `

// const Title = styled.div`
//   font-weight: bold;
// `

// export async function getStaticProps() {
// 	return {
// 		props: {
// 			posts: await getAllPosts(),
// 		},
// 	}
// }


/* eslint-disable no-multiple-empty-lines */

import { InferGetStaticPropsType } from "next";
import NextLink from "next/link";
import { useState, useMemo } from "react";
import styled from "styled-components";

import Page from "components/Page";
import SectionTitle from "components/SectionTitle";
import { getAllPosts } from "utils/postsFetcher";
import placementData from "./2025placement.json";
import intern2025Data from "./Intern2025-26.json";

// --- Types ---
interface PostMeta {
  title: string;
  description?: string;
  tags?: string;
  date: string;
}

interface Post {
  slug: string;
  content: string;
  meta: PostMeta;
}

interface PlacementItem {
  Name: string;
  Company: string;
  Upload: string;
}

// --- Helper Functions ---
const parseInsightTitle = (title: string) => {
  if (title.includes("Placed at :")) {
    const [name, company] = title.split("Placed at :");
    return { name: name.trim(), company: company.trim() };
  }
  if (title.includes("Interned at :")) {
    const [name, company] = title.split("Interned at :");
    return { name: name.trim(), company: company.trim() };
  }
  return { name: title, company: null };
};

// --- Reusable Components ---
const InsightCard = ({ name, company, href }: { name: string; company: string | null; href: string }) => (
  <NextLink href={href} passHref>
    <CardWrapper>
      <CardHeader>
        <AvatarPlaceholder>{name.charAt(0).toUpperCase()}</AvatarPlaceholder>
        <StudentName>{name}</StudentName>
      </CardHeader>
      {company && (
        <CompanyTag>
          <BuildingIcon>🏢</BuildingIcon>
          {company}
        </CompanyTag>
      )}
    </CardWrapper>
  </NextLink>
);

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <StatWrapper>
    <StatValue>{value}</StatValue>
    <StatLabel>{label}</StatLabel>
  </StatWrapper>
);

// --- Main Page Component ---
export default function BlogIndexPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState("");

const { filtered2025, filtered2025Interns, placements2024, interns2024, stats } = useMemo(() => {
    const query = searchValue.toLowerCase().trim();

    // 1. Filter 2025 Placement Data (Existing)
    const f2025 = (placementData as PlacementItem[]).filter((item) => {
      const searchString = `${item.Name} ${item.Company}`.toLowerCase();
      return searchString.includes(query);
    });

    // 2. Filter 2025-26 Intern Data (NEW!)
    const f2025Interns = (intern2025Data as any[]).filter((item) => {
      // Including Role in the search string so users can search by "GTE Intern"
      const searchString = `${item.Name} ${item.Company} ${item.Role || ""}`.toLowerCase();
      return searchString.includes(query);
    });

    // 3. Filter 2024 Posts (Existing)
    const fPosts = posts.filter((post: Post) => {
      const searchContent = `${post.meta.title} ${post.meta.description || ""} ${post.content} ${post.meta.tags || ""}`.toLowerCase();
      return searchContent.includes(query);
    });

    const p2024 = fPosts.filter((p: Post) => p.slug.includes("2024-placement")).sort((a: Post, b: Post) => new Date(b.meta.date).valueOf() - new Date(a.meta.date).valueOf());
    const i2024 = fPosts.filter((p: Post) => p.slug.includes("2024-intern")).sort((a: Post, b: Post) => new Date(b.meta.date).valueOf() - new Date(a.meta.date).valueOf());

    const all2024Placements = posts.filter((p: Post) => p.slug.includes("2024-placement")).length;
    const all2024Interns = posts.filter((p: Post) => p.slug.includes("2024-intern")).length;

    return {
      filtered2025: f2025,
      filtered2025Interns: f2025Interns, // Return the new filtered data
      placements2024: p2024,
      interns2024: i2024,
      stats: {
        totalPlacements: placementData.length + all2024Placements,
        totalInternships: intern2025Data.length + all2024Interns, // Update stats!
        totalInsights: placementData.length + intern2025Data.length + all2024Placements + all2024Interns,
      },
    };
  }, [searchValue, posts]);

  // Don't forget to update the empty state check!
  const hasNoResults = filtered2025.length === 0 && filtered2025Interns.length === 0 && placements2024.length === 0 && interns2024.length === 0;
  return (
    <Page title="SPO Insights" description="Explore interview experiences and preparation strategies from IIT Kanpur students.">
      
      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>SPO Insights</HeroTitle>
        <HeroSubtitle>
          Explore comprehensive interview experiences, placement strategies, and internship insights shared by IIT Kanpur alumni and students.
        </HeroSubtitle>
        
        <StatsGrid>
          <StatCard label="Total Insights" value={stats.totalInsights} />
          <StatCard label="Placement Experiences" value={stats.totalPlacements} />
          <StatCard label="Internship Experiences" value={stats.totalInternships} />
        </StatsGrid>

        <SearchContainer>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            aria-label="Search insights by name, company, or keywords"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by student name, company, or keywords..."
          />
        </SearchContainer>
      </HeroSection>

      <ContentContainer>
        {/* Global Empty State */}
        {hasNoResults && (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <EmptyText>No insights found matching "{searchValue}"</EmptyText>
            <EmptySubtext>Try adjusting your search terms or checking for typos.</EmptySubtext>
          </EmptyState>
        )}
		{/* 2025-26 Internship Insights */}
        {filtered2025Interns.length > 0 && (
          <Section>
            <SectionHeader>2025-26 Internship Insights</SectionHeader>
            <Grid>
              {filtered2025Interns.map((item, idx) => (
                <NextLink href={item.Upload} passHref key={`2025-i-${idx}`}>
                  <CardWrapper>
                    <CardHeader>
                      <AvatarPlaceholder>{item.Name.charAt(0).toUpperCase()}</AvatarPlaceholder>
                      <StudentName>{item.Name}</StudentName>
                    </CardHeader>
                    
                    {/* The new Role tag! */}
                    {item.Role && (
                       <RoleTag>{item.Role}</RoleTag>
                    )}

                    <CompanyTag>
                      <BuildingIcon>🏢</BuildingIcon>
                      {item.Company}
                    </CompanyTag>
                  </CardWrapper>
                </NextLink>
              ))}
            </Grid>
          </Section>
        )}

        {/* 2025 Placement Insights */}
        {filtered2025.length > 0 && (
          <Section>
            <SectionHeader>2025 Placement Insights</SectionHeader>
            <Grid>
              {filtered2025.map((item, idx) => (
                <InsightCard key={`2025-p-${idx}`} name={item.Name} company={item.Company} href={item.Upload} />
              ))}
            </Grid>
          </Section>
        )}

        {/* 2024 Placement Insights */}
        {placements2024.length > 0 && (
          <Section>
            <SectionHeader>2024 Placement Insights</SectionHeader>
            <Grid>
              {placements2024.map((post: Post) => {
                const { name, company } = parseInsightTitle(post.meta.title);
                return (
                  <InsightCard key={post.slug} name={name} company={company} href={`/insights/${post.slug}`} />
                );
              })}
            </Grid>
          </Section>
        )}

        {/* 2024 Internship Insights */}
        {interns2024.length > 0 && (
          <Section>
            <SectionHeader>2024 Internship Insights</SectionHeader>
            <Grid>
              {interns2024.map((post: Post) => {
                const { name, company } = parseInsightTitle(post.meta.title);
                return (
                  <InsightCard key={post.slug} name={name} company={company} href={`/insights/${post.slug}`} />
                );
              })}
            </Grid>
          </Section>
        )}
      </ContentContainer>
    </Page>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}

// --- Styled Components ---

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 4rem;
  box-sizing: border-box;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 1.5rem 3rem 1.5rem;
  background: linear-gradient(to bottom, rgba(var(--primary), 0.05), transparent);
  border-bottom: 1px solid rgba(150, 150, 150, 0.1);
  margin-bottom: 3rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: rgb(var(--text));
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(var(--text), 0.7);
  max-width: 600px;
  margin: 0 auto 2.5rem auto;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const StatWrapper = styled.div`
  background: rgb(var(--cardBackground));
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: var(--shadow-sm, 0 4px 6px rgba(0, 0, 0, 0.05));
  border: 1px solid rgba(150, 150, 150, 0.1);
  min-width: 200px;
  flex: 1;
  max-width: 250px;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(var(--text), 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  opacity: 0.5;
`;

const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box; /* <--- ADD THIS */
  height: 3.5rem;
  padding: 0 1rem 0 3.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  border: 2px solid rgba(150, 150, 150, 0.2);
  background: rgb(var(--cardBackground));
  color: rgb(var(--text));
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm, 0 4px 6px rgba(0, 0, 0, 0.05));

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(var(--primary), 0.1);
  }

  &::placeholder {
    color: rgba(var(--text), 0.4);
  }
`;
const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionHeader = styled(SectionTitle)`
  font-size: 2rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid rgba(var(--primary), 0.1);
  padding-bottom: 0.5rem;
  display: inline-block;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: 1.5rem;
`;
const CardWrapper = styled.a`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: rgb(var(--cardBackground));
  border-radius: 16px;
  border: 1px solid rgba(150, 150, 150, 0.1);
  box-shadow: var(--shadow-sm, 0 4px 6px rgba(0,0,0,0.04));
  text-decoration: none;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md, 0 10px 15px rgba(0,0,0,0.1));
    border-color: rgba(var(--primary), 0.3);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const AvatarPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(var(--primary), 0.1);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const StudentName = styled.h3`
  margin: 0;
  font-size: 1.15rem;
  color: rgb(var(--text));
  font-weight: 600;
  line-height: 1.3;
`;

const CompanyTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  background: rgba(150, 150, 150, 0.08);
  border-radius: 8px;
  font-size: 0.95rem;
  color: rgba(var(--text), 0.8);
  font-weight: 500;
  margin-top: auto;
`;

const BuildingIcon = styled.span`
  font-size: 1rem;
  opacity: 0.8;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: rgb(var(--cardBackground));
  border-radius: 20px;
  border: 1px dashed rgba(150, 150, 150, 0.3);
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyText = styled.h3`
  font-size: 1.5rem;
  color: rgb(var(--text));
  margin-bottom: 0.5rem;
`;

const EmptySubtext = styled.p`
  color: rgba(var(--text), 0.6);
  font-size: 1.1rem;
`;
const RoleTag = styled.div`
  font-size: 0.9rem;
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
