import React from 'react';

const SignUp = () => (
    <main>
        <h2>Sign Up</h2>
        <p>Unfortunately, FN Dash has been retired and no-longer is accepting new users.</p>
        <form>
            <label for="username">In-Game Username</label>
            <input name="username" placeholder="Enter your username..." disabled />
            <button disabled>Track my stats!</button>
        </form>
    </main>
);

export default SignUp;
