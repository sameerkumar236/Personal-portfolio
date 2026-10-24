const Image = ({ alt, loading = "lazy", ...props }) => (
    <img
        {...props}
        alt={alt}
        loading={loading}
        decoding="async"
    />
);

export default Image;
