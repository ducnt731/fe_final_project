import React from "react"
import Carousel from 'react-bootstrap/Carousel';
import '../../style/theater.css'

const ListMovie = () => {

    return (
        <div className="list-moive">
            <div className="header-title">Theater</div>
            <div className="theater-name">CGV Hoan Kiem</div>
            <div className="image-theater">
                <Carousel>
                    <Carousel.Item>
                        <img src="https://thegioidienanh.vn/stores/news_dataimages/thanhtan/112022/06/15/in_article/5139_CGV_1.jpg?rt=20221106155228" />
                            <Carousel.Caption>
                            <div className="footer-theater">
                                <div className="address-contact">
                                    <div>Level 3, Ho Guom Center Plaza, 102 Tran Phu, Mo Lao Ward, Ha Dong District, Hanoi</div>
                                    <div>+84 4 6 275 5240</div>
                                    <div>1900 6017</div>
                                </div>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="https://th.bing.com/th/id/R.c615f57b990d474ed9bfc7fb6c57cc15?rik=P0Q6e6XVlfxBqw&pid=ImgRaw&r=0" />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="https://cdn.topz.com.vn/viectainha/2021/07/cgv-vincom-bac-tu-liem.jpg.webp" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}

export default ListMovie