import { t } from 'i18next';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Biography = () => {
  const { setTab } = useOutletContext();

  useEffect(() => {
    setTab({ index: 2, title: t("dashboard.biography") });
  }, []);

    return (
      <div>Biography</div>
    )
}

export default Biography