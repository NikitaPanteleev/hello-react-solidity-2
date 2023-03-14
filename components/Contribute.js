import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import { useRouter } from 'next/router'
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

const ContributeForm = ({ address }) => {
    const router = useRouter();
    const [state, setState] = useState({
        value: "",
        errorMessage: "",
        loading: false,
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        setState({ loading: true, errorMessage: "" });

        const campaign = Campaign(address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(state.value, "ether"),
            });
            router.replace(`/campaigns/${address}`)
            setState({ loading: false, value: "" });
        } catch (err) {
            setState({ errorMessage: err.message, loading: false });
            console.log(err);
        }

    };

    return (
        <Form onSubmit={onSubmit} error={!!state.errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input label="ether" labelPosition="right" onChange={(event) => setState({ value: event.target.value })} />
            </Form.Field>
            <Message error header="Oops!" content={state.errorMessage} />
            <Button primary>Contribute!</Button>
        </Form>
    );
}

export default ContributeForm;
