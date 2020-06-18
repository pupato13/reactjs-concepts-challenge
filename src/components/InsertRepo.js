import React from "react";

import api from "../services/api";

function InsertRepo() {
    const addRepository = (title, url) => {
        alert(`Title: ${title}. URL: ${url}`);
    };

    return (
        <div>
            <input type="text" />
            <input type="text" />
            <input type="button" value="Add" />
        </div>
    );
}

export default InsertRepo;
