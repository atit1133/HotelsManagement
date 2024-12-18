import React from "react";

const Menu = () => {
  return (
    <aside>
      <nav>
        <h3 className="roboto-medium">General Management</h3>
        <ul>
          <li>Hotels</li>
          <li>Staff</li>
          <li>Dashboard</li>
        </ul>
        <h3 className="roboto-medium">Reservation Operations</h3>
        <ul>
          <li>Check-in</li>
          <li>Check-out</li>
          <li>Guest</li>
          <li>Booking</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Menu;
