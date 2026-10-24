const JsonLd = ({ jsonLd }) => {
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />;
};

export default JsonLd;
