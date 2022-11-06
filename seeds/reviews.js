const { v4: uuidv4 } = require('uuid');
gen_username = () => {
    const user_id = Math.floor(Math.random() * 10000000000000)
    let a = user_id
    return `User #${user_id}`;
}

module.exports = [
    {
        reviewId: uuidv4(),
        username: gen_username(),
        comment: "This is a comment",
    },
    {
        reviewId: uuidv4(),
        username: gen_username(),
        comment: "This is a comment",
    },
    {
        reviewId: uuidv4(),
        username: gen_username(),
        comment: "This is a comment",
    },
    {
        reviewId: uuidv4(),
        username: gen_username(),
        comment: "This is a comment",
    },
    {
        reviewId: uuidv4(),
        username: gen_username(),
        comment: "This is a comment",
    },
    {
        reviewId: uuidv4(),
        username: gen_username(),
        comment: "This is a comment",
    },
    {
        reviewId: uuidv4(),
        username: gen_username(),
        comment: "This is a comment",
    },
    {
        reviewId: uuidv4(),
        username: gen_username(),
        comment: "This is a comment",
    },
    {
        reviewId: uuidv4(),
        username: gen_username(),
        comment: "This is a comment",
    },
    {
        reviewId: uuidv4(),
        username: gen_username(),
        comment: "This is a comment",
    },
    {
        reviewId: uuidv4(),
        username: gen_username(),
        comment: "This is a comment",
    },
    
]