import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import Layout from "../../../../components/Layout";
import Link from 'next/link'

const RequestNew = () => {
    const router = useRouter();
    const { id } = router.query;

    const [state, setState] = useState({
        value: "",
        description: "",
        recipient: "",
        loading: false,
        errorMessage: "",
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(id);
        const { description, value, recipient } = state;

        setState({ ...state, loading: true, errorMessage: "" });

        try {
            const accounts = await web3.eth.getAccounts();
            console.log(state, accounts);
            await campaign.methods
                .createRequest(description, web3.utils.toWei(value + '', "ether"), recipient)
                .send({ from: accounts[0] });
            router.push(`/campaigns/${id}/requests`);
        } catch (err) {
            console.log(err);
            setState({ errorMessage: err.message });
        }
        setState({ loading: false });
    };


    return (
        <Layout>
            <Link href={`/campaigns/${id}/requests`}>
                Back
            </Link>
            <h3>Create a Request</h3>
            <Form onSubmit={onSubmit} error={!!state.errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={state.description || ''}
                        onChange={(event) =>
                            setState({ ...state, description: event.target.value })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input
                        value={state.value || ''}
                        onChange={(event) => setState({ ...state, value: event.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value={state.recipient || ''}
                        onChange={(event) =>
                            setState({ ...state, recipient: event.target.value })
                        }
                    />
                </Form.Field>
                <Message error header="Oops!" content={state.errorMessage} />
                <Button primary loading={state.loading}>
                    Create!
                </Button>
            </Form>
        </Layout>
    );
}

export default RequestNew;
