import {Navigate, useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children, isAuthenticated}) => {
    const navigate = useNavigate()

    if (!isAuthenticated) {
        // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        return <Navigate to="/login" replace/>;

    }

    return children;
};

export default ProtectedRoute;
