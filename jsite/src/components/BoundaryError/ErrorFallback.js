import React from 'react';
import Button from 'react-bootstrap/Button';

/**
 * chunks 로드 실패 fallback
 */
const ErrorFallback = () => {
    return (
        <div
            className="vw-100 vh-100 d-flex flex-column align-items-center justify-content-center"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'white',
                opacity: 0.9,
            }}
        >
            <h1>새로고침하시기 바랍니다</h1>
            <Button
                size="lg"
                variant="positive"
                onClick={() => {
                    window.location.reload();
                }}
            >
                새로고침 하기
            </Button>
        </div>
    );
};

export default ErrorFallback;
