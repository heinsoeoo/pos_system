const ErrorHandler = async(req, res) => {
    return res.status(404).send({error: "Unknown Endpoint!"});
}

module.exports = ErrorHandler;