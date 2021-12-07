import React from 'react';
import {
    EmailShareButton, EmailIcon,
    LinkedinShareButton, LinkedinIcon,
    RedditShareButton, RedditIcon,
    TwitterShareButton, TwitterIcon,
    FacebookShareButton, FacebookIcon,
    TelegramIcon, TelegramShareButton,
} from 'react-share';

const SocialShare = ({ shareUrl }) => {
    const fullUrl = `http://127.0.0.1:8000${shareUrl}`;
    return (
    <div>
        <h5><i>Share This Blog On:</i></h5>
        <EmailShareButton url={fullUrl}>
            <abbr title='Email'><EmailIcon size={32} round={true} /></abbr>
        </EmailShareButton>
        <LinkedinShareButton url={fullUrl}>
            <abbr title='Linkedin'><LinkedinIcon size={32} round={true} /></abbr>
        </LinkedinShareButton>
        <RedditShareButton url={fullUrl}>
            <abbr title='Reddit'><RedditIcon size={32} round={true} /></abbr>
        </RedditShareButton>
        <TwitterShareButton url={fullUrl}>
            <abbr title='Twitter'><TwitterIcon size={32} round={true} /></abbr>
        </TwitterShareButton>
        <FacebookShareButton url={fullUrl}>
            <abbr title='Facebook'><FacebookIcon size={32} round={true} /></abbr>
        </FacebookShareButton>
        <TelegramShareButton url={fullUrl}>
            <abbr title='Telegram'><TelegramIcon size={32} round={true} /></abbr>
        </TelegramShareButton>
    </div>
)};

export default SocialShare;