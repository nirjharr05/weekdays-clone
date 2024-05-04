import MultiSelectDropdown from "@/components/MultiSelect";

import CardGrid from "@/components/CardGrid";

import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filterBar}>
        <div className={styles.inputHolder}>
          <MultiSelectDropdown />
          <MultiSelectDropdown />
          <MultiSelectDropdown />
          <MultiSelectDropdown />
        </div>
      </div>
      <CardGrid />
    </div>
  );
};

export default Layout;
