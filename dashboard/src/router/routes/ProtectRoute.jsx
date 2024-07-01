import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectRoute = ({ route, children }) => {
    const { role: reduxRole, userInfo: reduxUserInfo } = useSelector(state => state.auth);
    const [role, setRole] = useState(reduxRole);
    const [userInfo, setUserInfo] = useState(reduxUserInfo);
    const location = useLocation();

    useEffect(() => {
        // Example: Fetch authentication state from local storage on component mount
        const storedRole = localStorage.getItem('role');
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (storedRole && storedUserInfo) {
            setRole(storedRole);
            setUserInfo(storedUserInfo);
        }
    }, []);

    useEffect(() => {
        // Example: Update local storage when Redux state changes
        localStorage.setItem('role', role);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }, [role, userInfo]);

    console.log("role:", role);
    console.log("userInfo:", userInfo);
    console.log("route:", route);

    // Check if the user is logged in
    if (role) {
        // Check if the route requires a specific role
        if (route.role) {
            if (userInfo) {
                // Check if user's role matches required role
                if (userInfo.role === route.role) {
                    if (route.status) {
                        // Check if user's status matches required status
                        if (route.status === userInfo.status) {
                            return <Suspense fallback={null}>{children}</Suspense>;
                        } else {
                            // Redirect based on user's status
                            if (userInfo.status === "pending") {
                                return <Navigate to='/seller/account-pending' replace />;
                            } else {
                                return <Navigate to='/seller/account-deactive' replace />;
                            }
                        }
                    } else {
                        return <Suspense fallback={null}>{children}</Suspense>;
                    }
                } else {
                    // Check if user's status allows visibility
                    if (route.visibility) {
                        if (route.visibility.some((r) => r === userInfo.status)) {
                            return <Suspense fallback={null}>{children}</Suspense>;
                        } else {
                            return <Navigate to='/seller/account-pending' replace />;
                        }
                    } else {
                        return <Suspense fallback={null}>{children}</Suspense>;
                    }
                }
            } else {
                // No user info found, redirect to unauthorized
                return <Navigate to='/unauthorized' replace />;
            }
        } else {
            // Route is accessible to any logged-in user
            return <Suspense fallback={null}>{children}</Suspense>;
        }
    } else {
        // User is not logged in, redirect to login
        if (location.pathname !== '/login') {
            localStorage.setItem('redirectPath', location.pathname); // Store the current location
        }
        return <Navigate to='/login' replace />;
    }
};

export default ProtectRoute;
