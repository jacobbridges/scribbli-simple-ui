import GlobalHeader from '~/components/global-header/global-header';
import LeftSidebar from '~/components/left-sidebar/left-sidebar';

export function WorldCodex() {
  return (
    <>
      <GlobalHeader></GlobalHeader>

      <div className={"main-container"}>
        {/* Sidebar */}
        <LeftSidebar></LeftSidebar>

        <main className="content-area">
          <div className="toolbar">
            <nav className="breadcrumb">
              <a href="#">The Shattered Realm</a> / <a href="#">Characters</a> / Lyra Blackthorn
            </nav>

            <div className="view-controls">
              <button className="view-btn active">Edit</button>
              <button className="view-btn">Preview</button>
              <button className="view-btn">History</button>
              <button className="view-btn">Connections</button>
            </div>
          </div>

          <div className="main-content">
            <div className="primary-panel">
              <h1 className="page-title">Lyra Blackthorn</h1>
              <p className="page-subtitle">Former Captain of the Royal Guard • Currently in exile</p>

              <div className="graph-preview">
                <div>Character Relationship Graph Placeholder</div>
              </div>

              <h2 className="section-title">Biography</h2>
              <p>Lyra Blackthorn served as Captain of the Royal Guard for seven years before the events of
                the Shadow War¹. Known for her unwavering loyalty and tactical brilliance, she was
                considered one of the most trusted advisors to King Aldric²...</p>
              <p className={"mt-16"}><small>¹ <em>Referenced in "The Fall of Valdris" - Chapter
                3</em></small></p>
              <p><small>² <em>Status changed in "The Fall of Valdris" - Chapter 12: Aldric's
                death</em></small></p>

              <h2 className="section-title">Physical Description</h2>
              <p>Standing at average height with auburn hair typically braided for battle, Lyra bears
                several notable scars from her military service...</p>

              <h2 className="section-title">Current Status</h2>
              <div className="card">
                <div className="card-header">As of "The Fall of Valdris" - Chapter 15</div>
                <div className="card-content">
                  <p><strong>Location:</strong> Wandering the Northern Wastes</p>
                  <p><strong>Status:</strong> Exiled, seeking redemption</p>
                  <p><strong>Last Seen:</strong> Chapter 15 - "The Price of Honor"</p>
                </div>
              </div>
            </div>

            <div className="secondary-panel">
              <button className="panel-toggle">›</button>

              <h3 className="section-title">Quick Info</h3>
              <div className="card">
                <div className="card-content">
                  <p><strong>Age:</strong> 34</p>
                  <p><strong>Origin:</strong> <a href="#">Valdris</a></p>
                  <p><strong>Occupation:</strong> Exile (Former Guard Captain)</p>
                  <p><strong>Status:</strong> <span className="status-badge">Alive</span></p>
                </div>
              </div>

              <h3 className="section-title">Relationships</h3>
              <ul className="item-list">
                <li>
                  <a href="#">King Aldric</a>
                  <span className="status-badge">Deceased</span>
                </li>
                <li>
                  <a href="#">Marcus Thorne</a>
                  <span className={"text-sm text-gray-500"}>Former Lieutenant</span>
                </li>
                <li>
                  <a href="#">Elena Voss</a>
                  <span className={"text-sm text-gray-500"}>Childhood Friend</span>
                </li>
              </ul>

              <h3 className="section-title">Connected Locations</h3>
              <ul className="item-list">
                <li><a href="#">Royal Palace</a></li>
                <li><a href="#">Guard Barracks</a></li>
                <li><a href="#">Northern Wastes</a></li>
              </ul>

              <h3 className="section-title">Story Appearances</h3>
              <ul className="item-list">
                <li>
                  <a href="#">The Fall of Valdris</a>
                  <span className={"text-sm text-gray-500"}>Ch. 1-15</span>
                </li>
                <li>
                  <a href="#">Echoes of War</a>
                  <span className={"text-sm text-gray-500"}>Mentioned</span>
                </li>
              </ul>

              <h3 className="section-title">Recent Changes</h3>
              <div className="card">
                <div className="card-content">
                  <p className={"text-sm text-gray-500"}>
                    <strong>Status updated:</strong> Changed from "Captain" to "Exile"
                    <br/><em>Triggered by story event in Ch. 12</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}