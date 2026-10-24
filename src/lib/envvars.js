const envvars = {
    BASE_URL: (import.meta.env?.VITE_BASE_URL || "https://www.linkedin.com/in/sameer-kumar-03b2b3326").replace(/\/$/, ""),
};

export default envvars;
