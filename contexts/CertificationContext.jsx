import React, {
    createContext,
    useState,
    useEffect
} from "react";

import axios from 'axios';

const CertificationContext = createContext();

const CertificationProvider = ({ children }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [data, setData] = useState(null);

    // TODO: Look for the async storage value instead of making the API call.
    useEffect(() => {
        axios.get(`${apiUrl}/api/quiz/1`)
            .then(results => {
                setData(results.data)
            })
    }, []);

    return (<CertificationContext.Provider value={data}>
                {children}
            </CertificationContext.Provider>);
};

export { CertificationProvider, CertificationContext };