import Head from "next/head";
import type { ReactElement } from "react";
import { LayoutAuthenticated } from "~/components/layouts/layout";
import type { NextPageWithLayout } from "../_app";
import { api } from "~/utils/api";
import { NetworkTable } from "../../components/modules/networkTable";
import { globalSiteTitle } from "~/utils/global";

const Networks: NextPageWithLayout = () => {
  const {
    data: userNetworks,
    isLoading,
    refetch,
  } = api.network.getUserNetworks.useQuery();
  const { mutate: createNetwork } = api.network.createNetwork.useMutation();
  //   const network = api.networkRouter.message.useQuery();
  const addNewNetwork = () => {
    // New network
    createNetwork(null, { onSuccess: () => void refetch() });
  };

  if (isLoading) {
    return <div>loading</div>;
  }
  const title = `${globalSiteTitle} - Networks`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="VPN Networks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full bg-base-100">
        <div className="mb-3 mt-3 flex w-full justify-center ">
          <h5 className="w-full text-center text-2xl">Networks</h5>
        </div>
        <div className="w-5/5 mx-auto flex flex-row flex-wrap justify-between space-y-10 p-4 text-sm sm:w-4/5 sm:p-10 md:text-base xl:space-y-0">
          <div className="relative bg-cover bg-center bg-no-repeat">
            <div className="container mx-auto px-4">
              <div className="mb-3 mt-3 flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
                <div className="w-full justify-center">
                  <button className={`btn btn-success`} onClick={addNewNetwork}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="mr-2 h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Add Network
                  </button>
                </div>
                <div className="w-full overflow-auto text-center ">
                  <p className="mb-3 text-sm">
                    Connect team members from anywhere in the world on any
                    device. ZeroTier creates secure networks between on-premise,
                    cloud, desktop, and mobile devices. Zerotier It&apos;s an
                    encrypted Peer-to-Peer technology, meaning that unlike
                    traditional VPN solutions, communications don&apos;t need to
                    pass through a central server or router — messages are sent
                    directly peer to peer.
                  </p>
                  <div className="text-center">
                    {userNetworks && userNetworks.length > 0 && (
                      <NetworkTable tableData={userNetworks} />
                    )}
                    {!userNetworks ||
                      (userNetworks.length === 0 && (
                        <div>No network found!</div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Networks.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Networks;
