import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../../style/home.css"
import ListCurrentMovies from "./listCurrentMovie";
import ListIncoming from "./listIncomingMovie";
import ListHotMovie from "./listHotMovie";

const Home = () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'item 6', 'item 7', 'item 8', 'item 9', 'item 10', 'item 11', 'item 12', 'item 13', 'item 14', 'item 15', 'item 16'];
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
        script.defer = true;
        script.setAttribute('data-use-service-core', 'true'); // Thêm thuộc tính cho script
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div className="body-container">
            <div className="elfsight-app-b4a4272c-66fc-46ba-a5c8-142c30bf58a1" data-elfsight-app-lazy></div>
            <div className="slide-container">
                <Carousel>
                    <Carousel.Item interval={3000}>
                        <img
                            className="Slide-img"
                            src="https://i.ytimg.com/vi/mH47bKOJECk/maxresdefault.jpg"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="Slide-img"
                            src="https://i.ytimg.com/vi/0ydYmbQxfjQ/maxresdefault.jpg"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="Slide-img"
                            src="https://www.film-nerd.com/wp-content/uploads/2023/03/john-wick-chapter-4-banner.jpg"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="Slide-img"
                            src="https://itsmoreofacomment.com/wp-content/uploads/2021/09/Dune-Movie-Official-Poster-banner-feature.jpg?fbclid=IwAR3UVGajM7yOumlznITNUJ7r6V56Ipyg77cr_9BYxnUGEpkD2hBJK5JBZ9k_aem_ASuy2E2OA10rg97PmQr05stL0Ib1uJZAvlvXKa6aMRMHtZc7t4fNcbaUxBYKGV4D1y5OFiSolG8X2QABS6LdBxoA"

                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="Slide-img"
                            src="https://th.bing.com/th/id/R.5509cfed23c75bea4d387725f72a8b7b?rik=9ALJ4cC%2f30dgqw&pid=ImgRaw&r=0"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="Slide-img"
                            src="https://th.bing.com/th/id/R.9daa251846041f311b91d930d6ffd628?rik=VVsNIq%2fGp5qGqQ&riu=http%3a%2f%2fcafmp.com%2fwp-content%2fuploads%2f2012%2f12%2fAvatar-Banner.jpg&ehk=kyRlfreulXK169%2b7F5MDqjmNznuaxsT%2bZlXBMeLCTT4%3d&risl=&pid=ImgRaw&r=0"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            {/* <div className="hot-movie">
                <h3>Hot movies</h3>
                <ListHotMovie items={items} />
            </div> */}
            <div className="now-showing">
                <h3>Current movies</h3>
                <ListCurrentMovies items={items} />
            </div>
            <div className="incoming">
                <h3>Incoming movies</h3>
                <ListIncoming items={items} />
            </div>

        </div>

    )
}

export default Home