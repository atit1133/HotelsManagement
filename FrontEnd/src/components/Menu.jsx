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
              to="/checkin"
              style={({ isActive }) => {
                return isActive
                  ? { fontSize: "20px", fontWeight: "bolder" }
                  : {};
              }}
            >
              Check-in
            </NavLink>
          </li>
          <li>
            <NavLink to="/staffs">Check-out</NavLink>
          </li>
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
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Menu;
