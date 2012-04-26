/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"862XjhoGDXXvh9NoCoGhHm2ZsHT0MYe1"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"z5Hjip98MW3tCBnXbxGKQPtNBRbhoyQC"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"hfTxDppc6BmgaMFpWhWl2pu9zKTh1s4i"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"xibZXdUIJMBNI3LXEAcNAdxek0HWvF2L"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"W37Suk7RyBcqXeIZqEwNs04hc34Wgv2h"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"wa6CTq2dirU7BBniGd7EjrruB6vakw8I"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
