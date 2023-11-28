export const ResetBtn = ({ reset }) => (
  <div className="panel-block">
    <a
      href="#/"
      className="button is-link is-outlined is-fullwidth"
      onClick={() => reset()}
    >
      Reset all filters
    </a>
  </div>
);
