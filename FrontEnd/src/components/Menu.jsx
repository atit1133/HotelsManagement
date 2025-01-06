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
            <NavLink to="/staffs">Staff</NavLink>
          </li>
          <li>
            <NavLink to="/staffs">Dashboard</NavLink>
          </li>
        </ul>
        <h3 className="roboto-medium">Reservation Operations</h3>
        <ul>
          <li>
            <NavLink to="/staffs">Check-in</NavLink>
          </li>
          <li>
            <NavLink to="/staffs">Check-out</NavLink>
          </li>
          <li>
            <NavLink to="/staffs">Guest</NavLink>
          </li>
          <li>
            <NavLink to="/staffs">Booking</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Menu;
