import loginData from "../data/login";

const validateUser = async (username, password) => {
    try {
        // Simulate asynchronous behavior (e.g., fetching data from a server)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if username and password are provided
        if (username && password) {
            // Find the user with matching username and password in the loginData array
            const user = loginData.find(user => user.username === username && user.password === password);
            
            if (user) {
                // Return the user object with the role
                return { ...user, role: user.role };
            } else {
                // Return null if no match is found
                return null;
            }
        } else {
            // Return null if username/password are not provided
            return null;
        }
    } catch (error) {
        console.error("Error validating user:", error);
        throw new Error("An error occurred while validating user"); // Throw an error if validation fails
    }
};

export default validateUser;
