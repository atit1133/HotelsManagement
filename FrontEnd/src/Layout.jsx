import Header from "./components/Header";
import Menu from "./components/Menu";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-content">
        <Menu />
        <main>{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
