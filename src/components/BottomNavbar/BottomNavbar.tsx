import "./BottomNavbar.css";

type BottomNavbarProps = {
  children: React.ReactNode;
};

function BottomNavbar({ children }: BottomNavbarProps) {
  return <div className="bottom-navbar">{children}</div>;
}
export default BottomNavbar;
