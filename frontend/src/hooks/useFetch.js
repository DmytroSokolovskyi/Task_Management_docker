import {useDispatch} from "react-redux";
import {useState} from "react";

export const useFetch = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [response, setResponse] = useState({});
    const dispatch = useDispatch();

    const goFetch = async (callback, toRedux) => {
        try {
            setLoading(true);

            const res = toRedux ? await dispatch(callback) : await callback;

            setResponse(res);
            setData(res.data);
            setError("");

            return res;
        } catch (e) {
            setError(e.message);
            setLoading(false);
            setResponse({});
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    return {
        error,
        loading,
        data,
        response,
        setData,
        goFetch,
    };
};
