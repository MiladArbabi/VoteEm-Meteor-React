import React from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

const MainLayout = ({children}) => 
    <div className='main-layout'>
      <header>
        <h1><a href='/'>GetEm Voting</a></h1>
        <LoginButtons />
        <nav>
            <a href='/about'>About</a>
        </nav>
      </header>
      {children}
    </div>

export default MainLayout;