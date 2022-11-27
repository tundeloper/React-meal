import classes from './mainNavigation.module.css'

const MainNav = (props) => {
  return <nav  className={classes.nav}>
  <h1>
  sign up to get sarted
  </h1>
  <div>
    <ul className={classes.ul}>
      <li>
        <a href='ee'>Login</a>
      </li>
      <li>
        <a href='ee'>Profile</a>
      </li>
      <li className={classes.logout}>
        <a href='ee'>Logout</a>
      </li>
    </ul>
  </div>
  </nav>
}

export default MainNav