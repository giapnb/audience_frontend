import { QueryBuilderMaterial } from '@react-querybuilder/material';
import { useState } from 'react';
import { formatQuery, QueryBuilder } from 'react-querybuilder';
import Box from "@mui/material/Box";


const fields = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
];

const initialQuery = {
    combinator: 'and',
    rules: [
        { field: 'firstName', operator: 'beginsWith', value: 'Stev' },
        { field: 'lastName', operator: 'in', value: 'Vai,Vaughan' },
    ],
};

export const AudienceConfig = () => {
    const [query, setQuery] = useState(initialQuery);

    return (
        <Box m={10}>
            <QueryBuilderMaterial>
                <QueryBuilder
                    fields={fields}
                    query={query}
                    onQueryChange={setQuery}
                />
            </QueryBuilderMaterial>
            <h4>Query</h4>
            <pre>
        <code>{formatQuery(query, 'sql')}</code>
      </pre>
        </Box>
    );
};