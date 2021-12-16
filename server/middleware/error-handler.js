function errorHandler(err, req, res, next) {
    let statusCode
    let errors = []

    switch(err.name) {
        case `SequelizeUniqueConstraintError`:
        case 'SequelizeForeignKeyConstraintError':
        case 'SequelizeValidationError':
            statusCode = 401
            errors = err.errors ? err.errors.map(el => el.message) : []
            break;
        case `missing_access_token`:
            statusCode = 401
            errors.push(`Please login first!`)
            break
        case 'json_web_token_error':
            statusCode = 401
            errors.push('User not found')
            break;
        case 'invalid_token':
            statusCode = 401
            errors.push('Something wrong when authentication, check again your identity')
            break;
        case `err_email/pass`:
            statusCode = 401
            errors.push('Email/password is wrong')
        case 'item exists':
            statusCode = 400,
            errors.push(`This item is already added`)
            break;
        case `not authorized`:
            statusCode = 403,
            errors.push(`you dont have access`)
            break
        case `item_404`:
            statusCode = 404,
            errors.push(`what you looking for is not exists`)
            break;
        default:
            statusCode = 500
            errors.push('Internal server error')
            break;
    }
    res.status(statusCode).json({errors})
}