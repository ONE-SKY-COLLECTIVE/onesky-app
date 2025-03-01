import { InstagramEmbed, FacebookEmbed, XEmbed } from 'react-social-media-embed';

interface ActivityProofProps {
    url: string;
    width?: number;
}

type EmbedComponent = (props: ActivityProofProps) => JSX.Element;
type EmbedType = 'instagram' | 'facebook' | 'twitter' | 'default';

const SOCIAL_MEDIA_EMBEDS: Record<EmbedType, EmbedComponent> = {
    instagram: (props: ActivityProofProps) => (
        <InstagramEmbed url={props.url} width={props.width} />
    ),
    facebook: (props: ActivityProofProps) => (
        <FacebookEmbed url={props.url} width={props.width} />
    ),
    twitter: (props: ActivityProofProps) => (
        <XEmbed url={props.url} width={props.width} />
    ),
    default: (props: ActivityProofProps) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
            src={props.url} 
            alt="Activity proof"
            width={props.width}
            className="mt-4 object-cover rounded-lg"
        />
    ),
};

export function ActivityProof({ url, width = 328 }: ActivityProofProps) {
    if (!url) return null;
    
    const getEmbedType = (): EmbedType => {
        if (url.includes('instagram.com')) return 'instagram';
        if (url.includes('facebook.com')) return 'facebook';
        if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
        return 'default';
    };

    const Embed = SOCIAL_MEDIA_EMBEDS[getEmbedType()];

    return (
        <div className="flex justify-center">
            <Embed url={url} width={width} />
        </div>
    );
}