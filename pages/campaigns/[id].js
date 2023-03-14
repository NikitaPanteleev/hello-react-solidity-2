import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/Contribute";
import Link from 'next/link'


const Post = (props) => {
    const router = useRouter();
    const [state, setState] = useState({
        minimumContribution: 0,
        balance: 0,
        requestsCount: 0,
        approversCount: 0,
        manager: '',
    });

    const { id } = router.query;
    useEffect(() => {
        async function getSummary() {
            const campaign = Campaign(id);
            const summary = await campaign.methods.getSummary().call();
            console.log(summary[1]);
            setState({
                minimumContribution: summary[0],
                balance: summary[1],
                requestsCount: summary[2],
                approversCount: summary[3],
                manager: summary[4],
            });
        }
        if (id !== undefined) {
            getSummary();
        }
    }, [id]);

    const renderCards = () => {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
        } = state;

        const items = [
            {
                header: manager,
                meta: "Address of Manager",
                description:
                    "The manager created this campaign and can create requests to withdraw money",
                style: { overflowWrap: "break-word" },
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution (wei)",
                description:
                    "You must contribute at least this much wei to become an approver",
            },
            {
                header: requestsCount,
                meta: "Number of Requests",
                description:
                    "A request tries to withdraw money from the contract. Requests must be approved by approvers",
            },
            {
                header: approversCount,
                meta: "Number of Approvers",
                description:
                    "Number of people who have already donated to this campaign",
            },
            {
                header: web3.utils.fromWei(balance + "", "ether"),
                meta: "Campaign Balance (ether)",
                description:
                    "The balance is how much money this campaign has left to spend.",
            },
        ];

        return <Card.Group items={items} />;
    }

    return <Layout>
        <Grid width={16}>
            <Grid.Row>
                <Grid.Column width={10}>{renderCards()}</Grid.Column>
                <Grid.Column width={6}>
                    <ContributeForm address={id} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Link href={`/campaigns/${id}/requests`}>
                        <Button primary>View Requests</Button>
                    </Link>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Layout >;
}

export default Post
