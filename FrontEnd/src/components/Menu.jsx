import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <aside>
      <nav>
        <h3 className="roboto-medium">General Management</h3>
        <ul>
          <li>
            <NavLink
              to="/hotels"
              style={({ isActive }) => {
                return isActive
                  ? { fontSize: "20px", fontWeight: "bolder" }
                  : {};
              }}
            >
              Hotels
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staffs"
              style={({ isActive }) => {
                return isActive
                  ? { fontSize: "20px", fontWeight: "bolder" }
                  : {};
              }}
            >
              Staff
            </NavLink>
          </li>
          <li>
            <NavLink to="/staffs">Dashboard</NavLink>
          </li>
        </ul>
        <h3 className="roboto-medium">Reservation Operations</h3>
        <ul>
          <li>
            <NavLink
              to="/guest"
              style={({ isActive }) => {
                return isActive
                  ? { fontSize: "20px", fontWeight: "bolder" }
                  : {};
              }}
            >
              Guest
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/booking"
              style={({ isActive }) => {
                return isActive
                  ? { fontSize: "20px", fontWeight: "bolder" }
                  : {};
              }}
            >
              Booking
            </NavLink>
            <ul>
              <li>
                <NavLink
                  to="/booking/check-in"
                  style={({ isActive }) => {
                    return isActive
                      ? { fontSize: "18px", fontWeight: "bold" }
                      : {};
                  }}
                >
                  {" "}
                  Check-in{" "}
                </NavLink>{" "}
              </li>
              <li>
                <NavLink
                  to="/booking/check-out"
                  style={({ isActive }) => {
                    return isActive
                      ? { fontSize: "18px", fontWeight: "bold" }
                      : {};
                  }}
                >
                  {" "}
                  Check-out{" "}
                </NavLink>{" "}
              </li>
              <li>
                <NavLink
                  to="/booking/comfirmed"
                  style={({ isActive }) => {
                    return isActive
                      ? { fontSize: "18px", fontWeight: "bold" }
                      : {};
                  }}
                >
                  {" "}
                  Confirmed{" "}
                </NavLink>{" "}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Menu;
