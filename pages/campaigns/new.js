import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { useRouter } from 'next/router'

const CampaignNew = () => {
    const router = useRouter();
    const [state, setState] = useState({
        minimumContribution: '',
        errorMessage: "",
        loading: false,
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        setState({ loading: true, errorMessage: "" });
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(state.minimumContribution)
                .send({
                    from: accounts[0],
                });
            setState({ loading: false });
            router.push('/');
        } catch (err) {
            setState({ errorMessage: err.message, loading: false });
            console.log(state, err);
        }
    };

    return (
        <Layout>
            <h3>Create Campaign</h3>
            <Form onSubmit={onSubmit} error={!!state.errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label="wei"
                        labelPosition="right"
                        value={state.minimumContribution || ''}
                        onChange={(event) =>
                            setState({ minimumContribution: event.target.value })
                        }
                    />
                </Form.Field>
                <Message error header="Oops!" content={state.errorMessage} />
                <Button loading={state.loading} primary>Create!</Button>
            </Form>
        </Layout>
    );
}

export default CampaignNew;
