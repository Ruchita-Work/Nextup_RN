/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
// created by Piyush Prashant at 20231111 15:51.
// piyushprashant93@gmail.com
import React from "react";
import { SkeletonView } from "react-native-ui-lib";
import { hp, wp } from "../../../utils/responsive";
import { Layout, customTheme } from "../../../constants";
import _ from 'lodash'

export function CirclePlaceholder(
    {
        height = wp(20),
        width = wp(20),
        times = 1,
        renderContent,
        showContent,
        ...rest

    }
) {
    return (
        <>
            <SkeletonView
                circle
                height={height}
                style={{
                    marginRight: wp(4)
                }}
                width={width}
                times={times}
                colors={['#333333', customTheme.colors.gray_200, '#333333']}
                {...rest}
            />
            <SkeletonView
                height={hp(1)}
                width={width}
                marginT-4
                style={{
                    marginRight: wp(4)
                }}
                times={times}
                colors={['#333333', customTheme.colors.gray_200, '#333333']}
                {...rest}
            />
        </>

    );
}

export function CardPlaceholder(
    {
        height = wp(20),
        width = wp(20),
        times = 1,
        renderContent,
        showContent,
        ...rest
    }
) {
    return (
        <>
            <SkeletonView
                height={height}
                style={{
                    marginRight: wp(4),
                    marginVertical: wp(4),
                    borderRadius: wp(12)
                }}
                width={width}
                times={times}
                colors={['#333333', customTheme.colors.gray_200, '#333333']}
                {...rest}
            />
        </>
    )
}

export function SectionPlaceholder(
    {
        height = wp(20),
        width = wp(20),
        times = 1,
        renderContent,
        showContent,
        ...rest
    }
) {

    return _.times(times).map((_, index) => (
        <React.Fragment key={index}>
            <SkeletonView
                height={hp(2)}
                colors={['#333333', customTheme.colors.gray_200, '#333333']}
                renderContent={renderContent}
                showContent={showContent}
                {...rest}

            />
            <CardPlaceholder
                height={Layout.height * 0.2}
                width={Layout.width}
                renderContent={renderContent}
                showContent={showContent}
                {...rest}

            />
        </React.Fragment>
    ))
}