const errorMiddleware = (err, req, res, next) => {
    const statusCode=err.status || 500;
    res.status(statusCode).json({
        success:false,
        message:err.message || "Internal server error",
     stack:process.env.NODE_ENV === "development" ? err.stack : undefined

    })
}

export default errorMiddleware;