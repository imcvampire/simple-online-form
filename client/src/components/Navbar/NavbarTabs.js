import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Link } from 'react-router-dom'

const styles = {
  tabs: {
    width: '40vw',
  },
}

const NavbarTabs = () => (
  <Tabs style={styles.tabs} value={window.location.pathname}>
    <Tab
      label="Create"
      data-route="/create"
      value="/create"
      containerElement={<Link to="/create" />}
    />
    <Tab
      label="Answer"
      data-route="/answer"
      value="/answer"
      containerElement={<Link to="/answer" />}
    />
  </Tabs>
)

export default NavbarTabs
