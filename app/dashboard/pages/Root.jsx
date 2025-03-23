import React, {useState} from "react";
import {  useMsal } from '@azure/msal-react';
import {call_api} from "../../api/audience.js";
import {audienceConfig, loginRequest} from "../../config/auth.js";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

const ProfileContent = () => {
    const {instance, accounts} = useMsal();
    const [data, setData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                call_api(audienceConfig.root, 'GET' ,response.accessToken).then((response) => setData(response));
            });
    }

    return (
        <>
            <h5 className="profileContent">Welcome </h5>
        </>
    );
};