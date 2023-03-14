import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Button, Table } from "semantic-ui-react";
import Layout from "../../../../components/Layout";
import RequestRow from "../../../../components/RequestRow";
import Link from 'next/link'
import Campaign from "../../../../ethereum/campaign";

const RequestIndex = (props) => {
    const router = useRouter();
    const [state, setState] = useState({
        id: null,
        requestsCount: 0,
        approversCount: 0,
        requests: [],
    });

    const { id } = router.query;
    console.log('id is' + id);
    useEffect(() => {
        async function getData() {
            const campaign = Campaign(id);
            const summary = await campaign.methods.getSummary().call();

            const requests = await Promise.all(
                Array(parseInt(summary[2]))
                    .fill()
                    .map((element, index) => {
                        return campaign.methods.requests(index).call();
                    })
            );
            setState({
                id: id,
                requestsCount: summary[2],
                approversCount: summary[3],
                requests: requests,
            });
            console.log('filled state', state);
        }
        if (id !== undefined) {
            getData();
        }
    }, [id]);
    console.log(state);


    const renderRows = () => {
        return state.requests.map((request, index) => {
            return (
                <RequestRow
                    key={index}
                    id={index}
                    request={request}
                    address={id}
                    approversCount={state.approversCount}
                />
            );
        });
    }

    const { Header, Row, HeaderCell, Body } = Table;

    return (
        <Layout>
            <h3>Requests</h3>
            <Link href={`/campaigns/${id}/requests/new`}>
                <Button primary floated="right" style={{ marginBottom: 10 }}>
                    Add Request
                </Button>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>{renderRows()}</Body>
            </Table>
            <div>Found {state.requestCount} requests.</div>
        </Layout>
    );
}

export default RequestIndex;
