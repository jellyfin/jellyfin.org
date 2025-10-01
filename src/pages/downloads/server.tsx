import { useHistory, useLocation } from "@docusaurus/router";
import useIsBrowser from "@docusaurus/useIsBrowser";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { useState } from "react";
import Layout from "@theme/Layout";
import Admonition from "@theme-original/Admonition";

import Pill from "../../components/common/Pill";
import DownloadDetails from "../../components/downloads/DownloadDetails";
import { Downloads, OsType } from "../../data/downloads";
import { UAParser } from "ua-parser-js";

import styles from "./index.module.scss";
import ExternalLinkIcon from "@theme/Icon/ExternalLink";

export default function DownloadsPage() {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [isStableLinks, setIsStableLinks] = useState<boolean>(true);
  const [isStableHelpVisible, setIsStableHelpVisible] = useState<boolean>(
    false,
  );
  const [activeButton, setActiveButton] = useState<string>();

  const [osType, _setOsType] = useState<OsType>(
    searchParams.get("os") as OsType,
  );

  const setOsType = (osType: OsType | undefined) => {
    const search = new URLSearchParams();

    if (osType) {
      search.set("os", osType);
    }
    history.push({
      search: search.toString(),
    });

    _setOsType(osType);
  };

  const isBrowser = useIsBrowser();

  if (isBrowser && osType === null) {
    const parser = new UAParser(navigator.userAgent);
    const os = parser.getOS();
    switch (os.name) {
      case "macOS":
        setOsType(OsType.MacOS);
        break;
      case "Windows":
        setOsType(OsType.Windows);
        break;
      case "Linux":
      default:
        setOsType(OsType.Linux);
        break;
    }
  }

  return (
    <Layout title="Downloads">
      <h1 className="text--center margin-top--lg">Downloads</h1>

      <main className="margin-vert--lg">
        <section className="container">
          <div className="row">
            <div className="col margin-bottom--md">
              <div className="pills">
                <Link to="/downloads" className="pills__item">
                  Clients
                </Link>
                <Link
                  to="/downloads/server"
                  className="pills__item pills__item--active"
                >
                  Server
                </Link>
                <Link to="https://repo.jellyfin.org" className="pills__item">
                  Full Repository
                  <ExternalLinkIcon />
                </Link>
              </div>
            </div>

            <div
              className={clsx(
                "col",
                "margin-bottom--md",
                styles["header-pills-middle"],
              )}
            >
              <div className="pills" style={{ overflowX: "auto" }}>
                <Pill
                  active={osType === OsType.Linux}
                  onClick={() => setOsType(OsType.Linux)}
                >
                  Linux
                </Pill>
                <Pill
                  active={osType === OsType.Docker}
                  onClick={() => setOsType(OsType.Docker)}
                >
                  Docker
                </Pill>
                <Pill
                  active={osType === OsType.Windows}
                  onClick={() => setOsType(OsType.Windows)}
                >
                  Windows
                </Pill>
                <Pill
                  active={osType === OsType.MacOS}
                  onClick={() => setOsType(OsType.MacOS)}
                >
                  macOS
                </Pill>
                <Pill
                  active={osType === OsType.DotNet}
                  onClick={() => setOsType(OsType.DotNet)}
                >
                  .NET
                </Pill>
              </div>
            </div>

            <div
              className={clsx(
                "col",
                "margin-bottom--md",
                styles["header-pills-end"],
              )}
            >
              <ul
                className={clsx(
                  "pills",
                  "margin-bottom--none",
                  styles["stable-links"],
                )}
              >
                <Pill
                  active={!isStableLinks}
                  onClick={() => {
                    setIsStableLinks(false);
                    setActiveButton(null);
                  }}
                >
                  Unstable
                </Pill>
                <Pill
                  active={isStableLinks}
                  onClick={() => {
                    setIsStableLinks(true);
                    setActiveButton(null);
                  }}
                >
                  Stable
                </Pill>
              </ul>

              <button
                className="button button--link"
                onClick={() => {
                  setIsStableHelpVisible(!isStableHelpVisible);
                }}
                style={{
                  verticalAlign: "baseline",
                }}
              >
                Help?
              </button>
            </div>
          </div>

          <div className="text--center margin-bottom--md">
            <a href="https://github.com/jellyfin/jellyfin/releases/latest">
              <img
                alt="Current Release"
                src="https://img.shields.io/github/release/jellyfin/jellyfin.svg"
              />
            </a>
          </div>

          {isStableHelpVisible && (
            <Admonition type="tip" title="Stable or Unstable?">
              <p>
                Generally, if you&apos;re a new user or don&apos;t want your
                server to change often, use the Stable version. If you want to
                help test the latest improvements and features and can handle
                some occasional breakage, use the Unstable version. New Unstable
                releases are published Weekly on Monday mornings (~05:00 UTC).
                NOTE: Always back up your existing configuration before testing
                Unstable releases as there is NO DOWNGRADE PATH; you must
                restore your Stable configuration from a backup. For more
                details, [please see this
                documentation](/docs/general/testing/upgrading-and-downgrading).
              </p>
            </Admonition>
          )}

          {Downloads.filter(
            (download) =>
              // OS Type matches filter
              download.osTypes.includes(osType) &&
              // Ensure there are unstable links if unstable is selected
              (isStableLinks || download.unstableButtons.length > 0),
          ).map((download) => (
            <DownloadDetails
              key={download.id}
              download={download}
              isStableLinks={isStableLinks}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          ))}
        </section>
      </main>
    </Layout>
  );
}
