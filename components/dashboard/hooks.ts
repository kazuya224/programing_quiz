import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export const useStats = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // fetch処理
    }, []);

    return data;
};