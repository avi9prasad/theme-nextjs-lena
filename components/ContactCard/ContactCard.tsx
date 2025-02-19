import type { ContactNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { ReactNode } from 'react';

import { useDevice } from '@/hooks';
import { IconEmail, IconFacebook, IconGlobe, IconMobile, IconPhone, IconTwitter } from '@/icons';

import type { ContactInfo } from './types';
import { getSocialHandles } from './utils';

import styles from './ContactCard.module.scss';

interface Props {
    className?: string;
    contactInfo: ContactInfo;
    isCompact?: boolean;
    renderAvatar: ({ className }: { className: string }) => ReactNode;
    uuid: ContactNode['uuid'];
}

function ContactCard({ className, contactInfo, isCompact = false, renderAvatar, uuid }: Props) {
    const device = useDevice();
    const { name, description, company, email, phone, mobile, website } = contactInfo;
    const { facebook, twitter } = getSocialHandles(contactInfo);
    const subtitle = description && company ? `${description}, ${company}` : description;

    return (
        <div
            id={`contact-${uuid}`}
            className={classNames(styles.container, className, {
                [styles.compact]: isCompact || device.isMobile,
            })}
        >
            <div className={styles.content}>
                {renderAvatar({ className: styles.avatar })}
                <div>
                    <h4 className={styles.name}>{name}</h4>
                    {subtitle && <h5 className={styles.position}>{subtitle}</h5>}
                </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.links}>
                <div className={styles.linkGroup}>
                    {email && (
                        <a href={`mailto:${email}`} className={styles.link}>
                            <IconEmail className={styles.icon} />
                            <span className={styles.linkText}>{email}</span>
                        </a>
                    )}
                    {website && (
                        <a href={website} className={styles.link}>
                            <IconGlobe width={16} height={16} className={styles.icon} />
                            <span className={styles.linkText}>{website}</span>
                        </a>
                    )}
                    {mobile && (
                        <a href={`tel:${mobile}`} className={styles.link}>
                            <IconMobile width={16} height={16} className={styles.icon} />
                            <span className={styles.linkText}>{mobile}</span>
                        </a>
                    )}
                    {phone && (
                        <a href={`tel:${phone}`} className={styles.link}>
                            <IconPhone width={16} height={16} className={styles.icon} />
                            <span className={styles.linkText}>{phone}</span>
                        </a>
                    )}
                </div>
                <div className={styles.linkGroup}>
                    {facebook && (
                        <a
                            href={`https://facebook.com/${facebook}`}
                            className={classNames(styles.link)}
                        >
                            <IconFacebook width={16} height={16} className={styles.icon} />
                            <span className={styles.linkText}>{facebook}</span>
                        </a>
                    )}
                    {twitter && (
                        <a
                            href={`https://twitter.com/${twitter}`}
                            className={classNames(styles.link)}
                        >
                            <IconTwitter width={16} height={16} className={styles.icon} />
                            <span className={styles.linkText}>{`@${twitter}`}</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ContactCard;
