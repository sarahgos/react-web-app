import Header from './Header';
import SignupBar from './SignupBar';
import { Divider } from 'semantic-ui-react';
import ArticleCardList from './ArticleCardList';
import TutorialCardList from './TutorialCardList';

// Homepage of web app.
function HomePage() {
  return (
    <div>
      <Header />
      <ArticleCardList />
      <Divider />
      <TutorialCardList />
      <SignupBar />
    </div>
  );
}

export default HomePage;