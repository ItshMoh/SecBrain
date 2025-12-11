import { Share } from "./Icons/Share";

export function Card() {
    return <div>
        <div className="p-8 bg-white rounded-md border-gray-200 max-w-72 border">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <Share></Share>
                    </div>
                    <div className="text-md">
                        hi there
                    </div>

                </div>
                <div className=" flex items-center">
                    <div className="pr-2 text-gray-500">
                        <Share></Share>
                    </div>
                    <div className="flex text-gray-500">
                        <Share></Share>
                    </div>
                </div>

            </div>
            <div pt-8>
                {/* <iframe className="w-full" src="https://www.youtube.com/embed/NYCUMKUBcXM?si=JVzY5-WxB-X2GS37" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}
                    
            </div>

        </div>
    </div>

}