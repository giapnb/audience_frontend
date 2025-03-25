import {QueryBuilderMaterial} from '@react-querybuilder/material';
import {useState} from 'react';
import {formatQuery, QueryBuilder} from 'react-querybuilder';
import Box from "@mui/material/Box";
import {QueryBuilderDnD} from "@react-querybuilder/dnd";
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import * as ReactDndTouchBackend from 'react-dnd-touch-backend';
import {Button} from "@mui/material";
import {useMsal} from "@azure/msal-react";
import {call_api} from "../../api/audience.js";
import {loginRequest} from "../../config/auth.js";

const fields = [
    {name: 'firstName', label: 'First Name'},
    {name: 'lastName', label: 'Last Name'},
];

const initialQuery = {
    "id": "bf2e7e27-50f7-40f4-983b-31c37644b44a",
    "combinator": "and",
    "not": true,
    "rules": [
        {
            "id": "afd0b52a-e730-4b7e-a9df-2ab3ed0cd04c",
            "field": "age",
            "operator": ">",
            "value": "28"
        },
        {
            "id": "b8b89a6c-b8a5-479b-85b3-645edb189c45",
            "combinator": "or",
            "rules": [
                {
                    "id": "ff8daad8-a1ca-4f02-a4e0-3663b1750721",
                    "field": "isMusician",
                    "operator": "=",
                    "value": true
                },
                {
                    "id": "e3e9a48c-df8f-4d67-b5c2-96ac852604b6",
                    "field": "lastName",
                    "value": "Vai, Vaughan",
                    "operator": "in"
                },
                {
                    "id": "9ca1fe62-dea8-4ad8-8529-0894086f8d54",
                    "field": "firstName",
                    "value": "Stev",
                    "operator": "beginsWith"
                },
                {
                    "id": "327c13cc-46ac-4902-a5de-2214bdc44337",
                    "field": "instrument",
                    "operator": "=",
                    "value": "Guitar"
                }
            ]
        },
        {
            "id": "2edff2e9-4803-42c2-b255-db33ac10160c",
            "field": "groupedField1",
            "operator": "contains",
            "value": "3535",
            "valueSource": "value"
        },
        {
            "id": "cd83e59e-a355-44eb-8035-6a6b627f940f",
            "field": "birthdate",
            "operator": "between",
            "value": "1954-10-03,1960-06-06"
        }
    ]
};

export const AudienceConfig = () => {
    const {instance, accounts} = useMsal();
    const [query, setQuery] = useState(initialQuery);
    const handleSubmit = async () => {
        const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        })

        const res = await call_api("", 'GET', response.accessToken)
        console.log(res)

    }

    return (
        <Box m={10}>
            <QueryBuilderDnD dnd={{...ReactDnD, ...ReactDndHtml5Backend, ...ReactDndTouchBackend}}>
                <QueryBuilderMaterial>
                    <QueryBuilder
                        fields={fields}
                        query={query}
                        onQueryChange={setQuery}
                        showNotToggle
                        controlClassnames={{queryBuilder: 'queryBuilder-branches'}}
                    />
                </QueryBuilderMaterial>
            </QueryBuilderDnD>


            <Button onClick={handleSubmit}>Test</Button>
        </Box>
    );
};