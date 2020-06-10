import React from "react"
import { ActivityIndicator, FlatList, View, Text } from "react-native"
import styled from "styled-components/native"
import { useQuery } from "@apollo/react-hooks"

import { Article } from "../../types/article"
import ArticleCard from "../../components/ArticleCard"
import { GET_TOP_HEADLINES } from "../../graphql/queries"

const Headlines: React.FC = () => {
	const { loading, error, data, refetch } = useQuery(GET_TOP_HEADLINES)

	if (loading) {
		return <Spinner />
	}

	if (error) {
		return (
			<Error>
				<ErrorText>Error fetching headlines.</ErrorText>
			</Error>
		)
	}

	return (
		<Articles>
			<FlatList
				data={data.headlines.articles}
				renderItem={({ item }: { item: Article }) => (
					<ArticleCard article={item} />
				)}
				keyExtractor={(item): string => item.title}
				refreshing={loading}
				onRefresh={refetch}
			/>
		</Articles>
	)
}

const Spinner = styled(ActivityIndicator)`
	flex: 1;
`
const Articles = styled(View)`
	align-items: center;
	margin-top: 5%;
`

const Error = styled(View)`
	align-items: center;
	flex: 1;
	justify-content: center;
`
const ErrorText = styled(Text)`
	font-size: 20px;
`

export default Headlines
