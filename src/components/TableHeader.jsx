export const TableHeader = ({ headers }) => (
  <thead>
    <tr>
      {headers.map(header => (
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            {header}

            <a href="#/">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>
      ))}
    </tr>
  </thead>
);
