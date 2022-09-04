import { useLocalStorageValue } from "@react-hookz/web";

function useDashboard() {
  const [dashboard, setDashboard] = useLocalStorageValue(
    "showDashboard",
    false,
    {
      initializeWithStorageValue: false,
    }
  );
  return {
    dashboard,
    setDashboard,
  };
}

export default useDashboard;
